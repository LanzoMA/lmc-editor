import { useEffect, useState } from 'react';
import EditorWindow from './components/EditorWindow';
import NavigationBar from './components/NavigationBar';
import OutputWindow from './components/OutputWindow';
import RamContentsWindow from './components/RamContentsWindow';
import styles from './styles/output-pane.module.css';
import { assembleIntoRam, run } from './utils/lmc-compiler';

function App() {
  const [code, setCode] = useState('');
  const [ram, setRam] = useState<number[]>([]);
  const [output, setOutput] = useState('');

  useEffect(() => {
    setCode('INP\nOUT')
  }, []);

  useEffect(() => {
    setOutput('');
  }, [ram]);

  function generateRamOutput() {
    setRam(assembleIntoRam(code));
  }

  function generateOutput() {
    setOutput('');
    setTimeout(() => {
      run('', setOutput, [...ram], setRam);
    }, 100)
  }

  return (
    <>
      <NavigationBar />
      <main>
        <EditorWindow
          generateRamOutput={generateRamOutput}
          generateOutput={generateOutput}
          code={code}
          setCode={setCode}
        />

        <div className={styles['output-pane']}>
          <OutputWindow output={output} />
          <RamContentsWindow ram={ram} />
        </div>
      </main>
    </>
  )
}

export default App
