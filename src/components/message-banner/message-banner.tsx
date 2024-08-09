import styles from './message-banner.module.css'

const MessageBanner = () => {
  return (
    <div className={`${styles.banner}`}>
      <span>
        This website is in Alpha, under active development. You can report
        issues there :{' '}
        <a
          href="https://airtable.com/appyhV3VcDKK8nJAn/shrWdNT92vwf5HJrP"
          target="_blank"
        >
          issues reporter
        </a>
      </span>
    </div>
  )
}

export default MessageBanner
