import React, { useEffect } from 'react';
import anime from 'animejs';
import { Container } from './styles';
import { createGrid, findClosestTile } from '@/utils/tilegrid';

const TiledBackground: React.FC = () => {
  useEffect(() => {
    const TILE_SIZE = 50; // 50px X 50px
    const wrapper = document.getElementById('tiles');

    let toggled = false;

    const handleTileClick = (index: number, columns: number, rows: number) => {
      toggled = !toggled;
      anime({
        targets: '.tile',
        easing: 'easeOutExpo',
        // opacity: toggled ? 0 : 1,
        // border: toggled ? '' : '1px solid #fff',
        borderRadius: toggled ? ['0%', '50%'] : ['50%', '0%'],
        scale: [
          { value: 0.1, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 },
        ],
        delay: anime.stagger(TILE_SIZE, {
          grid: [columns, rows],
          from: index,
        }),
      });
    };

    window.onresize = () => createGrid(wrapper!, TILE_SIZE, handleTileClick);

    createGrid(wrapper!, TILE_SIZE, handleTileClick);

    // mouse cursor
    let clickLocked = false;

    window.onclick = e => {
      if (clickLocked) return;

      clickLocked = true;
      const tiles = document.querySelectorAll('.tile');
      const closestTile = findClosestTile(tiles, e.clientX, e.clientY);
      const columns = Math.floor(window.innerWidth / TILE_SIZE);
      const rows = Math.floor(window.innerHeight / TILE_SIZE);

      handleTileClick(closestTile.index, columns, rows);

      const cursor = document.getElementById('cursor')!;

      cursor.style.opacity = '0';

      setTimeout(() => {
        clickLocked = false;
      }, 2500);

      anime({
        targets: [cursor],
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 1000,
        delay: 2500,
      });
    };

    window.onmouseover = () => {
      document.getElementById('cursor')!.style.visibility = 'visible';
    };
    window.onmouseout = () => {
      document.getElementById('cursor')!.style.visibility = 'hidden';
    };
    window.onmousemove = e => {
      const cursor = document.getElementById('cursor')!;
      cursor.style.top = e.pageY + 'px';
      cursor.style.left = e.pageX + 'px';
    };

    // Dispatch fake event on load to trigger cool animation
    window.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
  }, []);

  return (
    <Container>
      <div className="tiled-background">
        <div id="tiles"></div>
        <div id="cursor"></div>
      </div>
    </Container>
  );
};

export default TiledBackground;
