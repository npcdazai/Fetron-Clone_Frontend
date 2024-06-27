import { Helmet } from 'react-helmet-async';

import { Issuetracking } from 'src/sections/issueTracking/view';

// ----------------------------------------------------------------------

export default function FleetPage() {
  return (
    <>
      <Helmet>
        <title> Issue Tracking </title>
      </Helmet>

      <Issuetracking />
    </>
  );
}
