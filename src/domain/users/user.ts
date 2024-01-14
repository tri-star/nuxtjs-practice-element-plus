import z from 'zod'

/**
 * アプリケーション内部で利用するユーザー
 */
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  companyId: z.string().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})
export type User = z.infer<typeof userSchema>

/**
 * ユーザー新規登録フォーム用
 */
export const newUserFormSchema = z.object({
  name: z.string().min(1, '氏名を入力してください'),
  email: z.string().email('無効なメールアドレスです'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Za-z]+/, '英字を含めてください')
    .regex(/[0-9]+/, '数字を含めてください'),
})
export type NewUserForm = z.infer<typeof newUserFormSchema>

export type UserListResponse = {
  data: User[]
  count: number
}
