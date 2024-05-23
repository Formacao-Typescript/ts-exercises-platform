const findClosestTile = (
  tiles: NodeListOf<Element>,
  positionX: number,
  positionY: number
) => {
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
};

const createTile = (index: number, onClick: (index: number) => void) => {
  const tile = document.createElement('div');
  tile.classList.add('tile');

  tile.onclick = () => onClick(index);

  return tile;
};

const createTiles = (
  elementWrapper: HTMLElement,
  quantity: number,
  onClick: (index: number) => void
) => {
  Array.from(Array(quantity)).map((_, index) => {
    elementWrapper.appendChild(createTile(index, onClick));
  });
};

const createGrid = (
  elementWrapper: HTMLElement,
  tileSize: number,
  handleTileClick: (index: number, columns: number, rows: number) => void
) => {
  elementWrapper.innerHTML = '';

  const columns = Math.floor(window.innerWidth / tileSize);
  const rows = Math.floor(window.innerHeight / tileSize);

  elementWrapper.style.setProperty('--columns', String(columns));
  elementWrapper.style.setProperty('--rows', String(rows));

  elementWrapper.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  elementWrapper.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  const onClick = (index: number) => handleTileClick(index, columns, rows);
  createTiles(elementWrapper, columns * rows, onClick);
  console.info(`Grid created with ${columns} columns and ${rows} rows`);
};

export { findClosestTile, createTile, createTiles, createGrid };
