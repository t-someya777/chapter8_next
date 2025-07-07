import styles from './Button.module.scss'

type ButtonProps = {
  name: string
  text: string
  type?: 'submit'|'button'
  onClick?: () => void
  onSubmit?: () => void
}
export default function Button ({ name, text,type, onClick, onSubmit}: ButtonProps) {

    return (
      <button 
        className={`${styles[name]} ${styles.button}`}
        onClick={onClick}
        type={type}
        onSubmit={onSubmit}
        >{text}
        </button>
    )
}