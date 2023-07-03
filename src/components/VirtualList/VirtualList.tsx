import {
    List,
    WindowScroller,
    // CellMeasurer,
    CellMeasurerCache,
    ListRowRenderer,
} from 'react-virtualized';
import 'react-virtualized/styles.css'

interface VirtualListProps<T> {
    items: T[];
    rowRenderer: ListRowRenderer;
}

const VirtualList = <T,>({ items, rowRenderer }: VirtualListProps<T>) => {
    const cache = new CellMeasurerCache({
        defaultHeight: 100,
        fixedWidth: true,
    });

    return (
        <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <List
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={items.length}
                    rowHeight={cache.rowHeight}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    width={400}
                />
            )}
        </WindowScroller>
    );
};

export default VirtualList;
