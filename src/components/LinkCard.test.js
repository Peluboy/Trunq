import { render, screen } from "@testing-library/react";
import LinkCard from "./LinkCard";

test("on initial render", () => {
  render(<LinkCard />);

  screen.debug();
  //   expect(screen.getByRole("Mock Name")).toBeInTheDocument();

  //   expect(screen.getByRole(""));
});
