import EditorWindow from './components/EditorWindow'
import NavigationBar from './components/NavigationBar'
import OutputWindow from './components/OutputWindow'
import RamContentsWindow from './components/RamContentsWindow'
import styles from './styles/output-pane.module.css'

function App() {
  return (
    <>
      <NavigationBar />
      <main>
        <EditorWindow />

        <div className={styles['output-pane']}>
          <OutputWindow />
          <RamContentsWindow />
        </div>
      </main>
    </>
  )
}

export default App
