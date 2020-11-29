import { render, fireEvent, waitFor, cleanup } from "@testing-library/vue";
import App from "@/App.vue";
import axios from "axios";

jest.spyOn(axios, "get").mockResolvedValue({
  data: [
    {
      id: 1,
      fullUrl: "https://www.google.co.uk",
      shortUrl: "https://shortUrl.com/1",
    },
  ],
});

const axiosPostMock = jest.spyOn(axios, "post");
const axiosDeleteMock = jest
  .spyOn(axios, "delete")
  .mockResolvedValue({ status: 204 });

describe("App.vue", () => {
  afterEach(cleanup);

  it("it renders values returned from the api", async () => {
    const { getByText } = await render(App);

    await waitFor(() => {
      getByText("https://www.google.co.uk");
      getByText("https://shortUrl.com/1");
    });
  });

  it("adds the new entry to the dom when a user enters a new url", async () => {
    axiosPostMock.mockResolvedValueOnce({
      data: {
        id: 2,
        fullUrl: "https://www.amazon.co.uk",
        shortUrl: "https://shortUrl.com/2",
      },
    });
    const { getByPlaceholderText, getByText } = await render(App);
    const element = getByPlaceholderText("Enter a url to shorten");

    fireEvent.change(element, {
      target: { value: "https://www.amazon.co.uk" },
    });
    fireEvent.keyUp(element, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      getByText("https://shortUrl.com/2");
      getByText("https://www.amazon.co.uk");
    });
  });

  it("renders an error message when the api fails to save the url", async () => {
    axiosPostMock.mockRejectedValueOnce({});
    const { getByPlaceholderText, getByText } = await render(App);
    const element = getByPlaceholderText("Enter a url to shorten");

    fireEvent.change(element, {
      target: { value: "foobarbaz" },
    });
    fireEvent.keyUp(element, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      getByText("Failed to create URL.");
    });
  });

  it("removes the entry from the dom when a user presses the delete key", async () => {
    const { getAllByText, queryByText, findByText } = await render(App);

    await findByText("https://shortUrl.com/1");
    const deleteButton = getAllByText("Delete")[0];
    await fireEvent.click(deleteButton);
    await waitFor(async () => {
      expect(
        queryByText("https://shortUrl.com/1")
        //@ts-ignore
      ).not.toBeInTheDocument();

      expect(
        queryByText("https://www.google.co.uk")
        //@ts-ignore
      ).not.toBeInTheDocument();
    });
  });

  it("shows an error when the delete fails", async () => {
    axiosDeleteMock.mockRejectedValueOnce({});
    const { getAllByText, getByText, findByText } = await render(App);

    await findByText("https://shortUrl.com/1");
    const deleteButton = getAllByText("Delete")[0];
    await fireEvent.click(deleteButton);

    await waitFor(() => {
      getByText("Failed to delete.");
    });
  });
});
