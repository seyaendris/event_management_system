export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Event',
      route: '/events/create',
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
    {
      label: 'Vendors',
      route: '/products'
    }
  ]

  export const vendorHeaderLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Package',
      route: '/vendors/create',
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
    {
      label: 'Vendors',
      route: '/vendors'
    }
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
    isVip: false,
    vipPrice: '',
  }