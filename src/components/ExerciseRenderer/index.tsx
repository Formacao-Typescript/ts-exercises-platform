/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';
import { Container } from './styles';
import Markdown from 'react-markdown';
import MonacoEditor from '../MonacoEditor';
import { MdOutlineClose as CloseIcon } from 'react-icons/md';

interface ExerciseRendererProps {
  title: string;
  source: string;
}

const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({
  title,
  source,
}) => {
  const [rawMarkdown, setRawMarkdown] = React.useState<string>('');

  useEffect(() => {
    async function load(_source: string) {
      const response = await fetch(_source);
      const text = await response.text();
      // TODO: remove frontmatter
      setRawMarkdown(text);
    }

    void load(source);
  }, [source]);
  return (
    // <Container className="xs:format-sm md:format-lg dark:format-invert">
    <Container>
      <div className="editor">
        <h1 className="editor-title">
          <span className="text-gray-200">{title}.ts</span>
          <CloseIcon />
        </h1>
      </div>
      {/* <Markdown
        components={{
          code: node => {
            const isInline = !node.children?.toString().includes('\n');

            if (isInline) return <code>{node.children}</code>;

            return <MonacoEditor code={node.children} />;
          },
        }}
      >
        {rawMarkdown}
      </Markdown> */}
    </Container>
  );
};

export default ExerciseRenderer;
