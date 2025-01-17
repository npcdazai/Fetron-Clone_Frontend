import { Helmet } from 'react-helmet-async';

// import { BlogView } from 'src/sections/blog/view';
import { Issuetracking } from 'src/sections/issueTracking/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>
      <Issuetracking />
    </>
  );
}
