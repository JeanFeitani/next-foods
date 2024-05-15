import Header from '../(main)/components/header'

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="mx-auto hidden max-w-[1224px] xl:block">
        <Header searchBar />
      </div>
      {children}
    </div>
  )
}

export default MobileLayout
