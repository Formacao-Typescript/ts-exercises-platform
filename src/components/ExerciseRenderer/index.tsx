/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';
import { Container } from './styles';

interface ExerciseRendererProps {
  source: string;
}
const PATH = '../../../';
const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({ source }) => {
  useEffect(() => {
    async function load(fileSource: string) {
      const something = await import(PATH + fileSource);
      //   import("./assets/article.md").then(res => {
      //     fetch(res.default)
      //     .then(response => response.text())
      //     .then(text => console.log(text))
      // })

      console.log({ something });
    }

    void load(source);
  }, [source]);
  return <Container></Container>;
};

export default ExerciseRenderer;
