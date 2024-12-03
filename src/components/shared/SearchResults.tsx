import { Models } from 'appwrite'
import Loader from "@/components/shared/Loader";
import GridPostList from './GridPostList';

type SearchResultProps = {
  isSearchFetching: boolean,
  searchedPosts: Models.Document[]
}
const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if(isSearchFetching)return <Loader/>

  if(searchedPosts && searchedPosts.document.length > 0) {
    return (
      <GridPostList posts={searchedPosts.documents}/>
    )
  }
  return (
    <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
  )
}

export default SearchResults