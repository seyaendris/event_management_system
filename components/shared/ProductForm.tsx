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
import { productDefaultValues } from "@/constants";
import { productFormSchema } from "@/lib/validator";

type ProductFormProps = {
  userId: string;
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
};

const ProductForm = ({ userId, type, product, productId }: ProductFormProps) => {
  const initialValues = product && type === 'Update'
    ? { ...product }
    : productDefaultValues;

  const router = useRouter();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    if (type === 'Create') {
      try {
        const newProduct = await createProduct({
          product: { ...values },
          userId,
          path: '/profile',
        });

        if (newProduct) {
          form.reset();
          router.push(`/products/${newProduct._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'Update') {
      if (!productId) {
        router.back();
        return;
      }

      try {
        const updatedProduct = await updateProduct({
          userId,
          product: { ...values, _id: productId },
          path: `/products/${productId}`,
        });

        if (updatedProduct) {
          form.reset();
          router.push(`/products/${updatedProduct._id}`);
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
                  <Input placeholder="Product Name" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productCategoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <ProductDropdown onChangeHandler={field.onChange} value={field.value} />
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
            name="contactInfo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <div className="flex">
                    <Textarea placeholder="Provide Your Contact Information like phone number or email address ..." {...field} className="textarea rounded-2xl" />
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
                      placeholder="Price to rent"
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
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Product `}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
