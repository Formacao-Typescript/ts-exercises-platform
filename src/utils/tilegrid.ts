export function findClosestTile(
  tiles: NodeListOf<Element>,
  positionX: number,
  positionY: number
) {
  for (let i = 0; i < tiles.length; i++) {
    const tileRect = tiles[i].getBoundingClientRect();
    if (
      positionX >= tileRect.left &&
      positionX <= tileRect.right &&
      positionY >= tileRect.top &&
      positionY <= tileRect.bottom
    ) {
      return {
        index: i,
        element: tiles[i],
      };
    }
  }
  return { index: 0 };
}
