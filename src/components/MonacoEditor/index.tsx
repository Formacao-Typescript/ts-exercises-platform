import React, { useEffect, useRef } from 'react';
import { Container } from './styles';
import * as monaco from 'monaco-editor';
import { MdInfo as InfoIcon } from 'react-icons/md';

interface MonacoEditorProps {
  code: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ code }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor>();
  const [markers, setMarkers] = React.useState<monaco.editor.IMarker[]>([]);

  const height = code ? code.split('\n').length * 22 + 20 : 0;

  useEffect(() => {
    if (!editorRef.current) return;
    setEditor(
      monaco.editor.create(editorRef.current, {
        value: code,
        language: 'typescript',
        theme: 'vs-dark',
        scrollBeyondLastLine: false,
        minimap: { enabled: true },
        fontSize: 16,
      })
    );
  }, [code]);

  useEffect(() => {
    if (!editor) return;
    // editor.onKeyUp(() => {
    //   test(editor);
    // });
    editor.onDidChangeModelContent(() => {
      test(editor);
    });
  }, [editor]);

  function test(editor: any) {
    const model = editor.getModel();
    const markers = monaco.editor.getModelMarkers({ resource: model?.uri });
    setMarkers(markers);
    return markers;
  }

  function action() {
    if (!editor) return;

    const markers = test(editor);
    console.log('action', { markers });

    // markers.forEach(marker => {
    //   alert(`
    //   ATENÇÃO CHEFIA
    //   ERRO: ${marker.message}
    //   LÁ NA LINHA: ${marker.startLineNumber}
    //   NÍVEL DE GRAVIDADE: ${marker.severity}`);
    // });
  }
  return (
    <Container className="p-0.5 mb-2 me-2 rounded-lg bg-gradient-to-br from-green-400 to-blue-600  dark:text-white">
      <div className="px-5 py-2.5 duration-75 bg-white dark:bg-gray-900 rounded-md">
        <div ref={editorRef} style={{ height }}></div>
        <div className="interaction-section flex flex-row pt-2">
          <div className="interaction-section-buttons">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              onClick={action}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Verificar
              </span>
            </button>
          </div>
          <div className="interaction-section-markers w-full">
            {markers.map(marker => (
              <span
                key={marker.message}
                className="flex flex-row items-center bg-red-900 text-red-300 py-1.5 border-l-2"
              >
                <InfoIcon className="mx-4" />
                Linha {marker.startLineNumber}: {marker.message}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MonacoEditor;
