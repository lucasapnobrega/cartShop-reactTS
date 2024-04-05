import { z } from "zod"

export const categorySchema = z.object({
  category: z.string().min(1, ('Por favor, preencha esse campo.')).refine(value => isNaN(Number(value)), {
    message: 'A categoria não pode ser um número'
  })
})

export type CategorySchemaType = z.infer<typeof categorySchema>