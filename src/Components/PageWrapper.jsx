import { Box, DialogTitle, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DialogKYC from "./Dialogs/KYC";
import useSession from "../Hooks/useSession";
import useUser from "../Hooks/useUser";
import { useEffect, useState } from "react";

function PageWrapper({ collapseSidebar, isInvalidSession = false, children }) {
  const [session, { setUser, logout }] = useSession();
  const [modal, setModal] = useState({ kyc: false });
  const $User = useUser();
  const [isKyc, setIsKyc] = useState(false);
  const [notIsKyc, setNotIsKyc] = useState(false);

  const handleSubmitKYC = async (form) => {
    const body = new FormData();
    body.append("faces", form.document);
    body.append("faces", form.face1);
    body.append("faces", form.face2);

    const { status } = await $User.sendKYC(body);

    if (status) {
      setUser({ ...session?.user, KYC: 1 });
    }

    return status;
  };

  useEffect(() => {
    if (session?.user) {
      if (session?.user?.KYC === 1 || session?.user?.isAdmin()) {
        setIsKyc(true);
      } else {
        setNotIsKyc(true);
      }
    }
  }, [session]);

  return (
    <>
      {isKyc && (
        <Grid display="flex">
          {!isInvalidSession && <Sidebar collapseOn={collapseSidebar} />}
          <Grid flexGrow={1} display="flex" flexDirection="column" minHeight="100vh">
            <Header isInvalidSession={isInvalidSession} />
            <Box
              component="main"
              flexGrow={1}
              padding={6}
              sx={(t) => ({
                maxWidth: isInvalidSession ? "100vw" : `calc(100vw - ${t.sizes.sidebar.main}px - 16px)`,
                [t.breakpoints.down("lg")]: {
                  maxWidth: "100vw",
                  padding: 2,
                  paddingTop: 12,
                },
              })}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      )}
      {notIsKyc && (
        <>
          <DialogTitle style={{ textAlign: "center", marginTop: "100px" }}>
            Antes de iniciar, por favor acepta la política de KYC
          </DialogTitle>
          <DialogKYC open={true} onClose={() => setModal({ ...modal, kyc: false })} onSubmit={handleSubmitKYC} logout={() => logout()} />
        </>
      )}
    </>
  );
}

export default PageWrapper;
