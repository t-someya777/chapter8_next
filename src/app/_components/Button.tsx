import styles from './Button.module.scss'

type ButtonProps = {
  name: string
  text: string
  onClick?: () => void
  onSubmit?: () => void
}
export default function Button ({ name, text, onClick, onSubmit}: ButtonProps) {

    return (
      <button 
        className={`${styles[name]} ${styles.button}`}
        onClick={onClick}
        onSubmit={onSubmit}
        >{text}
        </button>
    )
}