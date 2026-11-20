import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { AssetOrigin, useAsset, useAssets } from "@sharadox/showcase-web-library/asset-origin";

afterEach(cleanup);

function Files() {
  const asset = useAsset("/photo/sofa.jpg");
  const assets = useAssets();
  return (
    <p>
      {asset} {assets("/brand/romo.svg")}
    </p>
  );
}

test("keeps the site's own paths at home, and serves them from the guest's address on another site", () => {
  const { container, rerender } = render(<Files />);
  expect(container.textContent).toBe("/photo/sofa.jpg /brand/romo.svg");
  rerender(
    <AssetOrigin origin="https://luispiresdecor.com">
      <Files />
    </AssetOrigin>,
  );
  expect(container.textContent).toBe(
    "https://luispiresdecor.com/photo/sofa.jpg https://luispiresdecor.com/brand/romo.svg",
  );
});
