import { Circle, Close } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Column, TaskItem } from "../types/Column";
import { formatIdNum } from "../utils/formatIdNum";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusGroupButton from "./StatusGroupButton";
import { getTaskPriorityIcon } from "../utils/getTaskPriorityIcon";
import AvatarLogo from "./AvatarLogo";
import { makeStyles } from "@mui/styles";
import PriorityLiveEdit from "./PriorityLiveEdit";
import AssigneLiveEdit from "./AssigneeLiveEdit";
import DescriptionLiveEdit from "./DescriptionLiveEdit";
import { OPTIONS } from "../consts/priority-enum";

interface TaskViewProps {
  item: TaskItem;
  onClose: () => void;
  onColumnsChange: Dispatch<SetStateAction<Column | null>>;
}

const useStyles = makeStyles(() => ({
  size: {
    width: 30,
    height: 30,
  },
}));

const TaskView: FunctionComponent<TaskViewProps> = ({
  item,
  onClose,
  onColumnsChange,
}) => {
  const classes = useStyles();
  const priorityValue = OPTIONS.find((o) => o.value === item.priority);
  const { color } = getTaskPriorityIcon(priorityValue?.value ?? "");
  return (
    <div>
      <Dialog
        open={true}
        fullWidth
        maxWidth="md"
        sx={{
          zIndex: 1700,
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginLeft: 2,
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Circle htmlColor={color} />
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              {formatIdNum(item.idNum!)}
            </Typography>
          </Box>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0px 16px",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                    height: 65,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "13px",
                  }}
                >
                  Description
                </Typography>
                <DescriptionLiveEdit item={item} />
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <StatusGroupButton
                  item={item}
                  onColumnsChange={onColumnsChange}
                  onClose={onClose}
                />
                <Accordion
                  defaultExpanded
                  sx={{
                    boxShadow: "none",
                    border: "1px solid #ddd",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontSize: "13px" }}>
                      Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List
                      sx={{
                        "& .MuiListItem-root": {
                          display: "flex",
                          paddingLeft: 0,
                          flexWrap: "wrap",
                        },
                        "& .MuiBox-root": {
                          flex: 1,
                          padding: "2px",
                          marginLeft: "5px",
                          display: "flex",
                          justifyContent: "center",
                        },
                        "& li:not(:last-child) div.MuiBox-root:hover": {
                          background: "#f2f4f6",
                          backgroundImage: "url(edit.png)",
                          backgroundPosition: "10px 5px",
                          backgroundSize: "20px",
                          backgroundRepeat: "no-repeat",
                          cursor: "pointer",
                        },
                        "& .MuiListItem-root p": {
                          width: 70,
                          fontWeight: 500,
                          fontSize: "13px",
                        },
                      }}
                    >
                      <PriorityLiveEdit item={item} />
                      <AssigneLiveEdit item={item} />
                      <ListItem>
                        <Typography variant="body2">Created by</Typography>
                        <Box>
                          <AvatarLogo
                            username={item.createdBy?.name ?? ""}
                            className={classes.size}
                          />
                        </Box>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskView;
