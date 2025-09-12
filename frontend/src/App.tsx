import FooterBar from "./components/footerbar"
import HeaderBar from "./components/headerbar"
import ItemPage from "./Pages/ItemPage"

function App() {
  return (
    //bg-gradient-to-b from-[#FFFDed] via-[#F8F5E0] to-[#F0EAD5]
    <div className="flex flex-col gap-4 min-h-screen select-none bg-slate-100">
      <HeaderBar />
      <ItemPage />
      <FooterBar />
    </div>
  )
}

export default App
