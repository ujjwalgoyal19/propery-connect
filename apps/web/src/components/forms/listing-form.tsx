'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type CreateListingInput, createListingSchema } from '@propery-connect/shared-types';

import { useForm } from 'react-hook-form';

export function ListingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateListingInput>({
    resolver: zodResolver(createListingSchema),
  });

  const onSubmit = async (_data: CreateListingInput) => {
    try {
      // TODO: Call API to create listing
    } catch (error) {
      // Handle error silently for now
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          {...register('title')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300"
          placeholder="Property title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300"
          placeholder="Property description"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          {...register('price', { valueAsNumber: true })}
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300"
          placeholder="0"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          {...register('location')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300"
          placeholder="Property location"
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
      >
        {isSubmitting ? 'Creating...' : 'Create Listing'}
      </button>
    </form>
  );
}
