import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/fleets/view';

// ----------------------------------------------------------------------

export default function FleetPage() {
  return (
    <>
      <Helmet>
        <title> Fleets </title>
      </Helmet>

      <UserView />
    </>
  );
}
