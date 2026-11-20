import { cleanup, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, test } from "vitest";
import { Guest } from "@sharadox/showcase-web-library/guest";
import { Portal } from "@sharadox/showcase-web-library/portal";

afterEach(cleanup);

describe("Portal", () => {
  test("draws at the end of the body, as it is on the site itself", () => {
    const { container } = render(
      <Portal>
        <p>viewer</p>
      </Portal>,
    );
    expect(container.textContent).toBe("");
    expect(document.body.lastElementChild!.outerHTML).toBe("<p>viewer</p>");
  });

  test("wears the site's look and the guest mark on another site", () => {
    render(
      <Guest look="look fonts">
        <Portal>
          <p>viewer</p>
        </Portal>
      </Guest>,
    );
    const layer = document.body.lastElementChild as HTMLElement;
    expect(layer.className).toBe("look fonts");
    expect(layer.hasAttribute("data-guest")).toBe(true);
    expect(layer.style.display).toBe("contents");
    expect(layer.textContent).toBe("viewer");
  });

  test("draws nothing on the server", () => {
    expect(renderToString(<Portal>viewer</Portal>)).toBe("");
  });
});
