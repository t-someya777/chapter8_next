import style from './LoginSigninForm.module.scss'

type LoginSigninFormProps = {
  handleSubmit: (event:React.FormEvent<HTMLFormElement>) => Promise<void>
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  button: string
}

export default function LoginSigninForm({handleSubmit, email, setEmail, password, setPassword, button}:LoginSigninFormProps) {
  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.inputContainer}>
          <label
            htmlFor="email"
            className={style.label}
          >
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={style.input}
            placeholder="name@company.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={style.inputContainer}>
          <label
            htmlFor="password"
            className={style.label}
          >
            パスワード
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className={style.input}
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button
            type="submit"
            className={style.button}
          >
            {button}
          </button>
        </div>
      </form>
    </div>
  )
}