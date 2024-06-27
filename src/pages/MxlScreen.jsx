import { Helmet } from 'react-helmet-async';

import { MxlScreenView } from 'src/sections/mxlScreen/view';

// ----------------------------------------------------------------------
export default function MxlScreen() {
  return (
    <>
      <Helmet>
        <title> MXL-SCREEN | Minimal UI </title>
      </Helmet>
      <MxlScreenView />
    </>
  );
}
