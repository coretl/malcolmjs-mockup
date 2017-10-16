/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import Menu, {MenuItem} from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import Select from 'material-ui/Select';
import Switch from 'material-ui/Switch';
import blueGrey from 'material-ui/colors/blueGrey';
import amber from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import lightBlue from 'material-ui/colors/lightBlue';

import AddIcon from 'material-ui-icons/Add';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import RadioButtonCheckedIcon from 'material-ui-icons/GpsFixed';
import RadioButtonUncheckedIcon from 'material-ui-icons/GpsNotFixed';
import OpenInNewIcon from 'material-ui-icons/OpenInNew';
import CloseIcon from 'material-ui-icons/Close';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import MenuIcon from 'material-ui-icons/Menu';
import ErrorIcon from 'material-ui-icons/Error';
import WarningIcon from 'material-ui-icons/Warning';
import Input from 'material-ui/Input';
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';


const menuOptions = {
  "breadcrumbs0": ['Layout', 'Component'],
  "breadcrumbs1": ['BRICK', 'PANDA', 'DET'],
  "breadcrumbs2": ['Layout', 'Component'],
  "breadcrumbs3": [],
};

const selected = {
  "breadcrumbs0": 'Layout',
  "breadcrumbs1": 'PANDA',
  "breadcrumbs2": 'Layout',
  "breadcrumbs3": 'TTLOUT32',
};

for (let i=1; i<45; i++) {
  menuOptions["breadcrumbs3"].push("TTLOUT" + i);
}

const drawerWidth = 360;

const styles = theme => ({
  root: {
    height: "100vh",
  },
  mainAppBar: {
    position: "relative",
  },
  hideDesktop: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    position: "relative",
    width: drawerWidth,
  },
  flex: {
    flex: 1,
  },
  button: {
    position: "fixed",
    bottom: "48px",
    right: "48px",
  },
  breadCrumbs: {
    width: "calc(100% - 96px)",
    overflow: "hidden"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  paramLabel: {
    width: drawerWidth/2 - 48,
    overflow: "hidden",
  },
  paramValue: {
    width: drawerWidth/2 - 48,
    overflow: "hidden",
  },
  paramIcon: {
    fill: blueGrey[200],
    '&:hover': {
      fill: blueGrey[400],
    },
  },
  warningIcon: {
    fill: red[500],
    '&:hover': {
      fill: red[700],
    },
  },
  errorIcon: {
    fill: amber[500],
    '&:hover': {
      fill: amber[700],
    },
  },
  ledIcon: {
    fill: lightBlue[500],
  },
});


class Index extends Component {
  state = {
    open: new Set(["parameters", "right", "outputen"]),
    anchorEl: null,
    options: [],
    selected: "",
    checked: true,
  };

  handleToggle = value => () => {
    let open = new Set(this.state.open);
    if (open.has(value)) {
      open.delete(value);
    } else {
      open.add(value);
    }
    this.setState({
      open: open,
    });
  };

  handleChange = (event, checked) => {
    this.setState({
      checked: checked
    });
  };

  handleClick = event => {
    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget,
      options: menuOptions[event.currentTarget.id],
      selected: selected[event.currentTarget.id]
    });
  };

  render() {
    const {classes, theme} = this.props;

    const leftDrawer = (
      <div>
        <AppBar className={classes.drawer}>
          <ToolBar>
            <IconButton onClick={this.handleToggle("left")}><CloseIcon/></IconButton>
            <Typography type="subheading" className={classes.flex}>Panda 1</Typography>
            <IconButton><OpenInNewIcon/></IconButton>
          </ToolBar>
        </AppBar>
        <List>
          <ListItem button onClick={this.handleToggle("configure")}>
            <ListItemText primary="Configure" />
            {this.state.open.has("configure") ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
          </ListItem>
          <Collapse in={this.state.open.has("configure")} transitionDuration="auto" unmountOnExit>
            <ListItem dense>
              <InfoOutlineIcon className={classes.paramIcon}/>
              <ListItemText className={classes.paramLabel} primary="File Path"/>
              <Input className={classes.paramValue} placeholder={0.1}/>
            </ListItem>
            <ListItem dense>
              <InfoOutlineIcon className={classes.paramIcon}/>
              <ListItemText className={classes.paramLabel} primary="Generator"/>
              <Button className={classes.paramValue} color="primary">Generator...</Button>
            </ListItem>
            <ListItem dense>
              <InfoOutlineIcon className={classes.paramIcon}/>
              <ListItemText className={classes.paramLabel} primary="A very long parameter name that should overflow the box"/>
              <Select
                value={10}
                input={<Input id="age-simple" />} className={classes.paramValue}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </ListItem>
            <ListItem>
              <ErrorIcon className={classes.errorIcon}/>
              <ListItemText className={classes.paramLabel}/>
              <Button raised className={classes.paramValue} color="primary">Configure</Button>
            </ListItem>
          </Collapse>
          <Divider light/>
          <ListItem>
            <InfoOutlineIcon className={classes.paramIcon}/>
            <ListItemText className={classes.paramLabel}/>
            <Button raised className={classes.paramValue} color="primary">Run</Button>
          </ListItem>
          <Divider light/>
          <ListItem>
            <WarningIcon className={classes.warningIcon}/>
            <ListItemText className={classes.paramLabel}/>
            <Button raised className={classes.paramValue} color="primary">Pause</Button>
          </ListItem>
          <Divider light/>
          <ListItem>
            <InfoOutlineIcon className={classes.paramIcon}/>
            <ListItemText className={classes.paramLabel}/>
            <Button raised disabled className={classes.paramValue} color="primary">Resume</Button>
          </ListItem>
        </List>
      </div>
    );

    let outputLED = "";
    if (this.state.checked) {
      outputLED = (<RadioButtonCheckedIcon className={classes.ledIcon}/>);
    } else {
      outputLED = (<RadioButtonUncheckedIcon className={classes.ledIcon}/>);
    }

    const rightDrawer = (
      <div>
        <AppBar className={classes.drawer}>
          <ToolBar>
            <IconButton onClick={this.handleToggle("right")}><CloseIcon/></IconButton>
            <Typography type="subheading" className={classes.flex}>Xspress3 trigger signal output</Typography>
            <IconButton><OpenInNewIcon/></IconButton>
          </ToolBar>
        </AppBar>
        <ListItem button onClick={this.handleToggle("parameters")}>
          <ListItemText primary="Parameters" />
          {this.state.open.has("parameters") ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>
        <Collapse in={this.state.open.has("parameters")} transitionDuration="auto" unmountOnExit>
          <ListItem dense>
            <InfoOutlineIcon className={classes.paramIcon}/>
            <ListItemText className={classes.paramLabel} primary="Output termination"/>
            <Select
              value={"50-Ohm"}
              input={<Input/>} className={classes.paramValue}
            >
              <MenuItem value="50-Ohm">50-Ohm</MenuItem>
              <MenuItem value="High-Z">High-Z</MenuItem>
            </Select>
          </ListItem>
          <ListItem>
            <InfoOutlineIcon className={classes.paramIcon}/>
            <ListItemText className={classes.paramLabel} primary="Output enabled"/>
            <Switch onChange={this.handleChange} checked={this.state.checked}/>
          </ListItem>
        </Collapse>
        <Divider light/>
        <ListItem button onClick={this.handleToggle("outputs")}>
          <ListItemText primary="Outputs" />
          {this.state.open.has("outputs") ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ListItem>
        <Collapse in={this.state.open.has("outputs")} transitionDuration="auto" unmountOnExit>
          <ListItem dense>
            <InfoOutlineIcon className={classes.paramIcon}/>
            <ListItemText className={classes.paramLabel} primary="Output"/>
            {outputLED}
          </ListItem>
        </Collapse>
      </div>
    );

    const mainToolbar = (
      <ToolBar>
        <IconButton
          onClick={this.handleToggle("left")}
          className={classNames(this.state.open.has("left") && classes.hideDesktop)}
        >
          <MenuIcon/>
        </IconButton>
        <ToolBar className={classes.breadCrumbs}>
          <a href='http://'>
            <Typography type="subheading">BL14I-ML-SCAN-01</Typography>
          </a>
          <IconButton id="breadcrumbs0" onClick={this.handleClick}><ExpandMoreIcon/></IconButton>
          <a href='http://'>
            <Typography type="subheading">Layout</Typography>
          </a>
          <IconButton id="breadcrumbs1" onClick={this.handleClick}><ExpandMoreIcon/></IconButton>
          <a href='http://'>
            <Typography type="subheading">PANDA</Typography>
          </a>
          <IconButton id="breadcrumbs2" onClick={this.handleClick}><ExpandMoreIcon/></IconButton>
          <a href='http://'>
            <Typography type="subheading">Layout</Typography>
          </a>
          <IconButton id="breadcrumbs3" onClick={this.handleClick}><ExpandMoreIcon/></IconButton>
          <a href='http://'>
            <Typography type="subheading" className={classes.flex}>TTLOUT32</Typography>
          </a>
        </ToolBar>
        <IconButton><OpenInNewIcon/></IconButton>
        <Menu id="menu"
              anchorEl={this.state.anchorEl}
              open={this.state.menuOpen}
              onRequestClose={this.handleToggle("menu")}
              PaperProps={{
                style: {
                  maxHeight: window.innerHeight - 48
                }
              }}>
          {this.state.options.map(option => (
            <MenuItem key={option} selected={option === this.state.selected} onClick={this.handleToggle("menu")}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </ToolBar>
    );

    let divStyle = {position: "relative", height: "100vh"};

    let sub = 0;
    if (this.state.open.has("left")) {
      divStyle.marginLeft = drawerWidth;
      sub += drawerWidth;
    }
    if (this.state.open.has("right")) {
      divStyle.marginRight = drawerWidth;
      sub += drawerWidth;
    }
    if (this.state.open.has("left") || this.state.open.has("right")) {
      divStyle.transition = theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      });
      divStyle.width = `calc(100% - ${sub}px)`;
    } else {
      divStyle.transition = theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      });
      divStyle.width = "100%";
    }

    const mainContent = (
      <div>
        <AppBar className={classes.mainAppBar}>
          {mainToolbar}
        </AppBar>
        <Button fab className={classes.button} onClick={this.handleToggle("right")}>
          <AddIcon />
        </Button>
      </div>
    );

    return (
      <div className={classes.root}>
        <Hidden smUp>
          <Drawer
            type="temporary"
            anchor="left"
            open={this.state.open.has("left")}
            onRequestClose={this.handleToggle("left")}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            >
            {leftDrawer}
          </Drawer>
          <div style={{position: "relative", height: "100vh", width: "100%"}}>
            {mainContent}
          </div>
          <Drawer
            type="temporary"
            anchor="right"
            open={this.state.open.has("right")}
            onRequestClose={this.handleToggle("right")}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {rightDrawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            type="persistent"
            anchor="left"
            open={this.state.open.has("left")}
          >
            {leftDrawer}
          </Drawer>
          <div style={divStyle}>
            {mainContent}
          </div>
          <Drawer
            type="persistent"
            anchor="right"
            open={this.state.open.has("right")}
          >
            {rightDrawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles, {withTheme: true})(Index));
