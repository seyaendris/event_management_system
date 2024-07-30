'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { deleteEvent } from '@/lib/actions/event.actions'
import { deleteProduct } from '@/lib/actions/product.actions'
import { deletePackage } from '@/lib/actions/package.actions'

export const DeleteConfirmation = ({ eventId, productId, packageId }: { eventId?: string, productId?: string, packageId?: string }) => {
  const pathname = usePathname()
  let [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    if (eventId) {
      await deleteEvent({ eventId, path: pathname });
    }
    if (productId) {
      await deleteProduct({ productId, path: pathname });
    }
    if (packageId) {
      await deletePackage({ packageId, path: pathname });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src="/assets/icons/delete.svg" alt="delete" width={20} height={20} />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will be permanently deleted
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className='bg-orange-600 hover:bg-orange-500'
            onClick={() =>
              startTransition(handleDelete)
            }>
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
