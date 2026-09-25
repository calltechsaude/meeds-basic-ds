import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { CenteredSpinner } from './Spinner'

export interface InfiniteScrollProps {
  hasMore: boolean
  onLoadMore: () => void
  isLoading?: boolean
  /** Container com scroll; sem ref, usa o viewport. */
  rootRef?: RefObject<HTMLElement | null>
  loader?: ReactNode
}

/** Sentinela com IntersectionObserver para paginação incremental. */
export function InfiniteScroll({ hasMore, onLoadMore, isLoading, rootRef, loader }: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) onLoadMore()
      },
      { root: rootRef?.current ?? null, rootMargin: '200px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore, rootRef])

  if (!hasMore && !isLoading) return null
  return <div ref={sentinelRef}>{isLoading ? (loader ?? <CenteredSpinner />) : null}</div>
}
