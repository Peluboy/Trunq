import { render } from "@testing-library/react";
import LinkRedirect from "../components/LinkRedirect";

describe("LinkRedirect", () => {
  test("redirects to the target URL", () => {
    const targetURL = "https://example.com";
    const assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };

    render(<LinkRedirect targetURL={targetURL} />);

    setTimeout(() => {
      expect(assignMock).toHaveBeenCalledWith(targetURL);
    }, 500);
  });
});
