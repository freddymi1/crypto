export const NavbarStyle = {
  navmain: 'w-full xl:fixed nav-main z-10',
  subDivNav: 'py-0 main-nav',
  subDivNavList: 'py-2 ',
  subDivNavMenu: 'py-6',
  navItem: 'flex flex-row items-center justify-between xl:justify-start gap-4',
  containerNavStyle: {
    main: 'max-w-[2520px] mx-auto 2xl:px-60 xl:px-32 md:24 sm:px-2 px-4'
  },
  logoStyle: {
    logo: 'cursor-pointer'
  },
  searchNavStyle: {
    search:
      'hidden sm:block border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer',
    bloc1: 'hidden sm:block flex flex-row items-center justify-between',
    bloc2: 'hidden sm:block text-sm font-semibold px-6',
    bloc3:
      'hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center',
    addGuestsBlock: {
      main: 'text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3',
      addGuests: 'hidden sm:block',
      searchIcon: 'p-2 bg-rose-500 rounded-full text-white'
    }
  },
  userMenu: {
    main: 'relative',
    subStyle: 'flex flex-row items-center gap-3',
    yourHomeText:
      'hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer',
    userMenuBarIcon:
      'hidden xl:block p-4 md:py-2 w-10 h-10 text-center md:px-2 flex flex-row justify-center items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition',
    posterStyler:
      'hidden xl:flex p-4 md:py-2 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition poster',
    posterStyler1:
      'xl:hidden p-4 md:py-4 md:px-4 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition poster',
    connexBtn:
      'p-3.5 xl:py-2 md:px-4 border-[1px] hidden xl:flex  flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition poster',
    filterStyler:
      'p-4 md:py-2 md:px-3.5 border-[1px] hidden xl:flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition filter',
    inputSearch:
      'p-4 md:py-2 md:pl-10 border-[1px] border-neutral-200 text-gray-600 rounded-full hover:shadow-md transition',
    avatarBlock: 'text-center',
    menuItemsMain:
      'absolute rounded-xl shadow-md w-full right-[5px] sm:w-[300px] sm:right-[10px] xl:w-1/2 overflow-hidden md:right-[10px] lg:right-[10px] xl:right-[40px] 2xl:right-[40px] top-12 text-sm transition z-50',
    menuItemsMainMail:
      'absolute rounded-xl shadow-md w-[18vw]  overflow-hidden xl:right-[150px] top-12 text-sm z-50 transition',
    menuItemsMainNotif:
      'absolute rounded-xl shadow-md w-[18vw] overflow-hidden xl:right-[80px] top-12 text-sm z-50 transition',
    menuItems: 'flex flex-col cursor-pointer',
    subMenuItems: {
      main: 'px-4 py-3 transition font-semibold'
    }
  }
}

export const ModalsStyles = {
  main: '  overflow-x-hidden overflow-y-hidden  fixed inset-0 z-10 outline-none focus:outline-none bg-neutral-800/70',
  subMain:
    'absolute top-[100px] lg:fixed justify-center items-center content-center w-full md:w-2/3 lg:w-2/3 xl:w-3/5 2xl:w-2/5 p-6 xl:p-0 mx-auto z-50',
  modalsStyle: {
    contentMain: 'translate duration-300',
    headerMain:
      'translate  border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none',
    headerModal: {
      main: 'flex items-center px-6 pt-6 rounded-t justify-between relative',
      subMain: 'p-1 border-0 hover:opacity-70 transition relative',
      titleModal: 'text-lg font-semibold'
    },
    modalBody: {
      mainBlock: 'relative p-0'
    },
    modalFooter: {
      mainFooter: 'flex flex-col gap-2 p-6',
      buttonFooterBlock: 'md:flex flex-row items-center gap-4 w-full'
    }
  }
}

export const ButtonStyle = {
  mainBtnStyle:
    'relative disabled:opacity-70 disabled:cursor-not-allowed rounded-full hover:opacity-80 transition w-full',
  btnIcon: 'absolute left-4 top-2'
}

export const RegisterStyle = {
  main: 'w-full relative',
  subMainStyle: 'text-neutral-700 absolute top-5 left-2',
  headingStyle: {
    main: 'flex flex-col gap-4',
    title: 'text-2xl font-bold',
    subtitle: 'font-light text-neutral-500 mt-2'
  },
  inputStyle: {
    label: 'text-sm text-neutral-500 duration-150 transform top-5 z-10',
    labelSuite:
      'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    inputForm:
      'peer w-full p-2 pt-2 font-light border-2 rounded-full outline-none transition disabled:opacity-70 disabled:cursor-not-allowed'
  },
  haveAccount: {
    main: 'text-neutral-500 text-center mt-4 font-light',
    subMain: 'flex flex-row justify-center items-center gap-2',
    loginLink: 'text-neutral-800 cursor-pointer hover:underline'
  }
}
