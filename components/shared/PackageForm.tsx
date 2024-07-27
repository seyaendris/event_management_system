"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import ProductDropdown from "./ProductDropdown";
import { IProduct } from "@/lib/database/models/product.model";
import { packageDefaultValues } from "@/constants";
import { packageFormSchema } from "@/lib/validator";
import { IPackage } from '@/lib/database/models/package.model';
import { createPackage, updatePackage } from '@/lib/actions/package.actions';
import PackageDropdown from './PackageDropdown';

type PackageFormProps = {
  userId: string;
  type: "Create" | "Update";
  packages?: IPackage;
  packageId?: string;
};

const PackageForm = ({ userId, type, packages, packageId }: PackageFormProps) => {
  const initialValues = packages && type === 'Update'
    ? { ...packages }
    : packageDefaultValues;

  const router = useRouter();

  const form = useForm<z.infer<typeof packageFormSchema>>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof packageFormSchema>) {
    if (type === 'Create') {
      try {
        const newPackage = await createPackage({
          packages: { ...values },
          userId,
          path: '/profile',
        });

        if (newPackage) {
          form.reset();
          router.push(`/packaged/${newPackage._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'Update') {
      if (!packageId) {
        router.back();
        return;
      }

      try {
        const updatedPackage = await updatePackage({
          userId,
          packages: { ...values, _id: packageId },
          path: `/packaged/${packageId}`,
        });

        if (updatedPackage) {
          form.reset();
          router.push(`/packaged/${updatedPackage._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Package Name" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="packageCategoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <PackageDropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="includedServices"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <div className="flex">
                    <Textarea placeholder="Services You Provide" {...field} className="textarea rounded-2xl" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-lg bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/dollar.svg"
                      alt="dollar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full bg-orange-500 hover:bg-orange-600"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Package `}
        </Button>
      </form>
    </Form>
  );
};

export default PackageForm;
