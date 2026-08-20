import EmptyState from '../components/common/EmptyState';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import ProductGrid from '../components/products/ProductGrid';
import ProductGridSkeleton from '../components/products/ProductGridSkeleton';
import Button from '../components/common/Button';
import './Shop.css';

const PRODUCTS_PER_PAGE = 8;

const CATEGORY_LABELS = {
  smartphones: 'Smartphones',
  laptops: 'Laptops',
  tablets: 'Tablets',
  'mobile-accessories': 'Mobile Accessories',
};

function getCategoryLabel(category) {
  return (
    CATEGORY_LABELS[category] ||
    category
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase(),
      )
  );
}

function Shop() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const urlSearchQuery =
    searchParams.get('search')?.trim() || '';

  const urlCategory =
    searchParams.get('category')?.trim() || '';

  const [searchInput, setSearchInput] =
    useState(urlSearchQuery);

  const [sortOption, setSortOption] =
    useState('');

  const [currentPage, setCurrentPage] =
    useState(1);

  const {
    products,
    loading,
    error,
  } = useProducts(
    urlSearchQuery,
    urlCategory,
  );

  const {
    categories,
    loading: categoriesLoading,
  } = useCategories();

  function handleSearch(event) {
    event.preventDefault();

    const query = searchInput.trim();

    const nextParams = new URLSearchParams(
      searchParams,
    );

    if (query) {
      nextParams.set('search', query);
    } else {
      nextParams.delete('search');
    }

    nextParams.delete('category');

    setCurrentPage(1);
    setSearchParams(nextParams);
  }

  function handleClearSearch() {
    const nextParams = new URLSearchParams(
      searchParams,
    );

    nextParams.delete('search');

    setSearchInput('');
    setCurrentPage(1);
    setSearchParams(nextParams);
  }

  function handleCategoryChange(category) {
    const nextParams = new URLSearchParams(
      searchParams,
    );

    nextParams.delete('search');

    if (category) {
      nextParams.set('category', category);
    } else {
      nextParams.delete('category');
    }

    setSearchInput('');
    setCurrentPage(1);
    setSearchParams(nextParams);
  }

  function handleSortChange(event) {
    setSortOption(event.target.value);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleResetFilters() {
    setSearchInput('');
    setSortOption('');
    setCurrentPage(1);
    setSearchParams({});
  }

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortOption) {
      case 'price-asc':
        return sorted.sort(
          (a, b) => a.price - b.price,
        );

      case 'price-desc':
        return sorted.sort(
          (a, b) => b.price - a.price,
        );

      case 'rating-desc':
        return sorted.sort(
          (a, b) => b.rating - a.rating,
        );

      case 'name-asc':
        return sorted.sort((a, b) =>
          a.title.localeCompare(b.title),
        );

      case 'name-desc':
        return sorted.sort((a, b) =>
          b.title.localeCompare(a.title),
        );

      default:
        return sorted;
    }
  }, [products, sortOption]);

  const totalPages = Math.ceil(
    sortedProducts.length /
      PRODUCTS_PER_PAGE,
  );

  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1),
  );

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) *
      PRODUCTS_PER_PAGE;

    const endIndex =
      startIndex + PRODUCTS_PER_PAGE;

    return sortedProducts.slice(
      startIndex,
      endIndex,
    );
  }, [
    sortedProducts,
    safeCurrentPage,
  ]);

  return (
    <main>
      <Section>
        <SectionHeading
          eyebrow="NEXORA Store"
          title="Technology for everyday life."
          description="Explore smartphones, laptops, tablets, and essential tech accessories selected for performance and everyday use."
        />

        <form
          className="shop-search"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            value={searchInput}
            onChange={(event) =>
              setSearchInput(
                event.target.value,
              )
            }
            placeholder="Search technology products..."
            aria-label="Search technology products"
          />

          <Button type="submit">
            Search
          </Button>

          {urlSearchQuery && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          )}
        </form>

        <div className="shop-toolbar">
          <div
            className="shop-categories"
            aria-label="Product categories"
          >
            <button
              type="button"
              className={
                urlCategory === ''
                  ? 'shop-category shop-category--active'
                  : 'shop-category'
              }
              onClick={() =>
                handleCategoryChange('')
              }
            >
              All
            </button>

            {!categoriesLoading &&
              categories.map(
                (category) => (
                  <button
                    type="button"
                    className={
                      urlCategory ===
                      category
                        ? 'shop-category shop-category--active'
                        : 'shop-category'
                    }
                    key={category}
                    onClick={() =>
                      handleCategoryChange(
                        category,
                      )
                    }
                  >
                    {getCategoryLabel(
                      category,
                    )}
                  </button>
                ),
              )}
          </div>

          <select
            className="shop-sort"
            value={sortOption}
            onChange={handleSortChange}
            aria-label="Sort products"
          >
            <option value="">
              Sort by
            </option>

            <option value="price-asc">
              Price: Low to High
            </option>

            <option value="price-desc">
              Price: High to Low
            </option>

            <option value="rating-desc">
              Rating: High to Low
            </option>

            <option value="name-asc">
              Name: A to Z
            </option>

            <option value="name-desc">
              Name: Z to A
            </option>
          </select>
        </div>

        {urlSearchQuery &&
          !loading &&
          !error && (
            <p className="shop-search__result">
              {sortedProducts.length}{' '}
              result
              {sortedProducts.length !==
              1
                ? 's'
                : ''}{' '}
              for "{urlSearchQuery}"
            </p>
          )}

        {!urlSearchQuery &&
          urlCategory &&
          !loading &&
          !error && (
            <p className="shop-search__result">
              Showing products in "
              {getCategoryLabel(
                urlCategory,
              )}
              "
            </p>
          )}

        {loading && (
          <ProductGridSkeleton count={8} />
        )}

        {error && (
          <div className="shop-error">
            <p>
              We couldn't load the
              products.
            </p>

            <p>{error}</p>

            <Button
              type="button"
              onClick={
                handleResetFilters
              }
            >
              Reset filters
            </Button>
          </div>
        )}

        {!loading && !error && (
          <>
            {sortedProducts.length ===
            0 ? (
              <EmptyState
                title="No tech products found"
                description={
                  urlSearchQuery
                    ? `We couldn't find any technology products matching "${urlSearchQuery}".`
                    : urlCategory
                      ? `There are no products available in "${getCategoryLabel(
                          urlCategory,
                        )}".`
                      : 'There are currently no technology products available.'
                }
                actionLabel="View All Products"
                onAction={
                  handleResetFilters
                }
              />
            ) : (
              <>
                <ProductGrid
                  products={
                    paginatedProducts
                  }
                />

                {totalPages > 1 && (
                  <div className="shop-pagination">
                    <button
                      type="button"
                      className="shop-pagination__button"
                      disabled={
                        safeCurrentPage ===
                        1
                      }
                      onClick={() =>
                        handlePageChange(
                          safeCurrentPage -
                            1,
                        )
                      }
                    >
                      Previous
                    </button>

                    <div className="shop-pagination__pages">
                      {Array.from(
                        {
                          length:
                            totalPages,
                        },
                        (_, index) =>
                          index + 1,
                      ).map(
                        (page) => (
                          <button
                            type="button"
                            key={page}
                            className={
                              safeCurrentPage ===
                              page
                                ? 'shop-pagination__page shop-pagination__page--active'
                                : 'shop-pagination__page'
                            }
                            onClick={() =>
                              handlePageChange(
                                page,
                              )
                            }
                          >
                            {page}
                          </button>
                        ),
                      )}
                    </div>

                    <button
                      type="button"
                      className="shop-pagination__button"
                      disabled={
                        safeCurrentPage ===
                        totalPages
                      }
                      onClick={() =>
                        handlePageChange(
                          safeCurrentPage +
                            1,
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Section>
    </main>
  );
}

export default Shop;