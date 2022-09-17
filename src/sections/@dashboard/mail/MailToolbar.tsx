// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Tooltip,
  Checkbox,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 84,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
  [theme.breakpoints.up('md')]: {
    width: 240,
    flexDirection: 'row',
    '&.Mui-focused': { width: 280 },
  },
}));

// ----------------------------------------------------------------------

type Props = {
  mails: number;
  selectedMails: number;
  onOpenSidebar: VoidFunction;
  onToggleDense: VoidFunction;
  onSelectAll: VoidFunction;
  onDeselectAll: VoidFunction;
};

export default function MailToolbar({
  mails,
  selectedMails,
  onOpenSidebar,
  onToggleDense,
  onSelectAll,
  onDeselectAll,
  ...other
}: Props) {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const handleSelectChange = (checked: boolean) => (checked ? onSelectAll() : onDeselectAll());
  const selectedAllMails = selectedMails === mails && mails > 0;
  const selectedSomeMails = selectedMails > 0 && selectedMails < mails;

  return (
    <RootStyle {...other}>
      {!mdUp && (
        <IconButton onClick={onOpenSidebar}>
          <Iconify icon={'eva:menu-fill'} />
        </IconButton>
      )}

      {smUp && (
        <>
          <Checkbox
            checked={selectedAllMails}
            indeterminate={selectedSomeMails}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleSelectChange(event.target.checked)
            }
          />
          <Tooltip title="Refresh">
            <IconButton>
              <Iconify icon={'eva:refresh-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dense">
            <IconButton onClick={onToggleDense}>
              <Iconify icon={'eva:collapse-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="More">
            <IconButton>
              <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <FormControl size="small">
        <SearchStyle
          placeholder="Search mail…"
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      </FormControl>

      {smUp && (
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
            1 - {mails} of {mails}
          </Typography>
          <Tooltip title="Next page">
            <IconButton>
              <Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous page">
            <IconButton>
              <Iconify icon={'eva:arrow-ios-forward-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </RootStyle>
  );
}
