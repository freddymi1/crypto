'use client'

import { RegisterStyle } from '@/utils/constantStyle'

interface HeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}
export const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center
}) => {
  return (
    <div className={center ? 'text-start' : 'text-start'}>
      <div className={RegisterStyle.headingStyle.title}>
        <h3 className="text-xl xl:text-2xl">{title}</h3>
      </div>
      <div className={RegisterStyle.headingStyle.subtitle}>{subtitle}</div>
    </div>
  )
}
