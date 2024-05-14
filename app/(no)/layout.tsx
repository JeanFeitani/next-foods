import Header from '../(main)/components/header'

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[1224px]">
      <div className="hidden xl:block">
        <Header searchBar />
      </div>
      {children}
    </div>
  )
}

export default MobileLayout
