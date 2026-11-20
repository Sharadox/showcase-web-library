// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { use } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { Guest, GuestContext } from "@sharadox/showcase-web-library/guest";

afterEach(cleanup);

function Look() {
  return <p>{use(GuestContext)}</p>;
}

test("marks the guest, passes its look on, and keeps its links from leaving while the rest works", () => {
  const pressed = vi.fn();
  const followed = vi.fn();
  const { container } = render(
    <Guest className="look extra" style={{ color: "red" }} look="look">
      <a href="#elsewhere" onClick={followed}>
        <span>Book a Visit</span>
      </a>
      <button type="button" onClick={pressed}>
        Linen
      </button>
      <Look />
    </Guest>,
  );
  const wrapper = container.firstElementChild as HTMLElement;
  expect(wrapper.hasAttribute("data-guest")).toBe(true);
  expect(wrapper.className).toBe("look extra");
  expect(wrapper.style.color).toBe("red");
  expect(container.querySelector("p")!.textContent).toBe("look");
  const click = new MouseEvent("click", { bubbles: true, cancelable: true });
  container.querySelector("span")!.dispatchEvent(click);
  expect(click.defaultPrevented).toBe(true);
  expect(followed).not.toHaveBeenCalled();
  container.querySelector("button")!.click();
  expect(pressed).toHaveBeenCalledOnce();
});

test("is no guest outside a Guest", () => {
  const { container } = render(<Look />);
  expect(container.textContent).toBe("");
});
