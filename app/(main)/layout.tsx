import Header from './components/header'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[1224px]">
      <Header searchBar />
      {children}
    </div>
  )
}

export default AppLayout
