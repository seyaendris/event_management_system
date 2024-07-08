// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }
  
  // ====== EVENT PARAMS
  export type CreateEventParams = {
    userId: string
    event: {
      title: string
      description: string
      location: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url?: string
      isVip: boolean
      vipPrice?: string
    }
    path: string
  }
  
  export type UpdateEventParams = {
    userId: string
    event: {
      _id: string
      title: string
      imageUrl: string
      description: string
      location: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url?: string
      isVip: boolean
      vipPrice?: string
    }
    path: string
  }
  
  export type DeleteEventParams = {
    eventId: string
    path: string
  }
  
  export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetEventsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
  }
  
  export type Event = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    imageUrl: string
    location: string
    startDateTime: Date
    endDateTime: Date
    url?: string
    isVip: boolean
    vipPrice?: string
    organizer: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      name: string
    }
  }

  // ====== PACKAGE PARAMS
  export type CreatePackageParams = {
    userId: string
    packages: {
      name: string;
      description?: string;
      price: string;
      packageCategoryId: string
      includedServices: string,
    }
    path: string
  }

  export type UpdatePackageParams = {
    userId: string
    packages: {
      _id: string
      name: string;
      description?: string;
      price: string;
      packageCategoryId: string
      includedServices: string,
    }
    path: string
  }

  export type DeletePackageParams = {
    packageId: string
    path: string
  }

  export type GetAllPackagesParams = {
    query: string
    packageCategory: string
    limit: number
    page: number
  }

  export type GetPackagesByUserParams = {
    userId: string
    limit?: number
    page: number
  }

  export type GetRelatedPackagesByCategoryParams = {
    packageCategoryId: string
    packageId: string
    limit?: number
    page: number | string
  }

  export type Packages = {
    _id: string
    name: string
    description: string
    price: string
    includedServices: string,
    vendor: {
      _id: string
      firstName: string
      lastName: string
    }
    packageCategory: {
      _id: string
      name: string
    }
  }

    // ====== PRODUCT PARAMS
    export type CreateProductParams = {
      userId: string
      product: {
        name: string;
        description?: string;
        price: string;
        productCategoryId: string
        contactInfo: string,
      }
      path: string
    }
  
    export type UpdateProductParams = {
      userId: string
      product: {
        _id: string
        name: string;
        description?: string;
        price: string;
        productCategoryId: string
        contactInfo: string,
      }
      path: string
    }
  
    export type DeleteProductParams = {
      productId: string
      path: string
    }
  
    export type GetAllProductsParams = {
      query: string
      productCategory: string
      limit: number
      page: number
    }
  
    export type GetProductsByUserParams = {
      userId: string
      limit?: number
      page: number
    }
  
    export type GetRelatedProductsByCategoryParams = {
      productCategoryId: string
      productId: string
      limit?: number
      page: number | string
    }
  
    export type Product = {
      _id: string
      name: string
      description: string
      price: string
      includedServices: string,
      vendor: {
        _id: string
        firstName: string
        lastName: string
      }
      productCategory: {
        _id: string
        name: string
      }
    }

  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }

   // ====== PACKAGECATEGORY PARAMS
   export type CreatePackageCategoryParams = {
    packageCategoryName: string
  }

   // ====== PRODUCTCATEGORY PARAMS
   export type CreateProductCategoryParams = {
    productCategoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    isVip: boolean
    vipPrice?: string
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }