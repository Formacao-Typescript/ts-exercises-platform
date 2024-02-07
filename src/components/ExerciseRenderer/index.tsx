/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';
import { Container } from './styles';
import Markdown from 'react-markdown';
import MonacoEditor from '../MonacoEditor';

interface ExerciseRendererProps {
  source: string;
}

const PATH = '../../../';

const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({ source }) => {
  const [rawMarkdown, setRawMarkdown] = React.useState<string>('');

  useEffect(() => {
    async function load(fileSource: string) {
      const response = await fetch(PATH + fileSource);
      const text = await response.text();
      setRawMarkdown(text);
    }

    void load(source);
  }, [source]);
  return (
    <Container className="format-lg dark:format-invert">
      <Markdown
        components={{
          code: node => {
            const isInline = !node.children?.toString().includes('\n');

            if (isInline) return <code>{node.children}</code>;

            return <MonacoEditor code={node.children} />;
          },
        }}
      >
        {rawMarkdown}
      </Markdown>
    </Container>
  );
};

export default ExerciseRenderer;
