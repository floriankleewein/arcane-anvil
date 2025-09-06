import HeaderBar from "./components/headerbar"
import ItemPage from "./Pages/ItemPage"

function App() {
  return (
    // <div className="flex h-screen justify-center items-center select-none">
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FFFDed] via-[#F8F5E0] to-[#F0EAD5]">
      <HeaderBar></HeaderBar>
      <ItemPage></ItemPage>
    </div>
  )
}

export default App
