import React, { useEffect, useRef } from 'react';
import { Container } from './styles';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
  code: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ code }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor>();

  const height = code ? code.split('\n').length * 19 + 20 : 0;

  useEffect(() => {
    if (!editorRef.current) return;
    setEditor(
      monaco.editor.create(editorRef.current, {
        value: code,
        language: 'typescript',
        theme: 'vs-dark',
        scrollBeyondLastLine: false,
      })
    );
  }, [code]);

  // useEffect(() => {
  //   if (!editor) return;
  //   editor.onDidChangeModelContent(() => {
  //     const model = editor.getModel();
  //     const markers = monaco.editor.getModelMarkers({ resource: model?.uri });

  //     console.log({ model, markers });
  //   });
  // }, [editor]);

  function action() {
    if (!editor) return;

    const model = editor.getModel();
    const markers = monaco.editor.getModelMarkers({ resource: model?.uri });

    console.log({ model, markers });
    markers.forEach(marker => {
      alert(`
      ATENÇÃO CHEFIA
      ERRO: ${marker.message}
      LÁ NA LINHA: ${marker.startLineNumber}
      NÍVEL DE GRAVIDADE: ${marker.severity}`);
    });
  }
  return (
    <Container>
      <div ref={editorRef} style={{ height }}></div>
      <button type="button" onClick={action}>
        Check
      </button>
    </Container>
  );
};

export default MonacoEditor;
