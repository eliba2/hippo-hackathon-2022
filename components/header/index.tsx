import Typography from "@mui/material/Typography";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { MapDataType } from "../../interfaces/api";

export type HeaderProps = {
  dataType: MapDataType;
  setDataType: (arg0: MapDataType) => void;
};

const Header = (props: HeaderProps) => {
  return (
    <section id="header">
      <Typography variant="h2" component="h2" fontWeight={400}>
        Hippo Heat Map
      </Typography>
      <div id="type-switch">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Policies</Typography>
          <Switch
            checked={props.dataType === MapDataType.PoliciesCount}
            onClick={() => {
              const newType =
                props.dataType === MapDataType.Claims
                  ? MapDataType.PoliciesCount
                  : MapDataType.Claims;
              props.setDataType(newType);
            }}
          />
          <Typography>Claims</Typography>
        </Stack>
      </div>
    </section>
  );
};

export default Header;
