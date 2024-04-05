import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(1, ('Por favor, preencha esse campo.')),
  price: z.number().min(1, ('Por favor, informe um número válido.')),
  image: z.string().url('Por favor, informe uma URL válida.'),
  stock: z.number().min(1, ('Por favor, informe um número válido.')),
  category: z.string().refine(value => value !== "", {
    message: 'Por favor, selecione uma categoria.'
  })
})

export type FormSchemaType = z.infer<typeof formSchema>