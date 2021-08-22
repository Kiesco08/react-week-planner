import React, { useEffect, useState } from 'react'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Checkbox,
  Text,
  Box,
  Spacer,
  useToast,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import WeekEvent from '../WeekEvent'
import DatePicker from './DatePicker'
import { parseTime } from '../utils/timeHelper'
import TextView from './TextView'
import TimeField from './TimeField'
import isSameDay from 'date-fns/isSameDay'
import RadioButtons from './RadioButtons'
import InputField from './InputField'
import {
  defaultConfig,
  DeleteResult,
  SaveResult,
  WeekEventInput,
  WeekPlannerConfig,
  weekPlannerStrings,
} from '../utils/WeekPlannerConfig'
import { BiPencil } from 'react-icons/bi'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event: WeekEventInput
  onSave: (event: WeekEvent) => void
  onDelete: (event: WeekEvent['id']) => void
  config?: WeekPlannerConfig
}

const EventModal = ({
  isOpen,
  onClose,
  event,
  onSave,
  onDelete,
  config = defaultConfig,
}: EventModalProps) => {
  const [start, setStart] = useState(event.start)
  const [end, setEnd] = useState(event.end)
  const [endConfirmed, setEndConfirmed] = useState(true)
  const {
    timeFormats,
    spacing,
    onSaveEvent,
    eventTypes,
    toastDurationMilli,
    onDeleteEvent,
    willDeleteEvent,
  } = config
  const toast = useToast()
  const strings = weekPlannerStrings

  const timeTypeError = strings.invalidTime
  const EventSchema = Yup.object().shape({
    title: Yup.string().required(strings.titleRequired),
    startTime: Yup.date()
      .required(strings.startTimeRequired)
      .transform((_, originalValue) => {
        return parseTime(_, originalValue, timeFormats)
      })
      .typeError(timeTypeError),
    endTime: Yup.date()
      .required(strings.endTimeRequired)
      .transform((_, originalValue) => {
        return parseTime(_, originalValue, timeFormats)
      })
      .typeError(timeTypeError),
    notes: Yup.string().nullable(),
  })

  const parseUpdateResults = (
    result: SaveResult | DeleteResult,
    isDelete: boolean
  ) => {
    const { errors } = result
    const saveResult = result as SaveResult
    const deleteResult = result as DeleteResult
    const toastSuccess = () => {
      toast({
        title: isDelete ? strings.eventDeleted : strings.eventSaved,
        status: 'success',
        duration: toastDurationMilli,
        isClosable: true,
        position: 'top',
      })
    }
    if (errors && errors.length !== 0) {
      errors.map((error) =>
        toast({
          title: error,
          status: 'error',
          duration: toastDurationMilli,
          isClosable: true,
          position: 'top',
        })
      )
    } else if (saveResult.event && !isDelete) {
      toastSuccess()
      onSave(saveResult.event)
    } else if (deleteResult.event?.id && isDelete) {
      toastSuccess()
      onDelete(deleteResult.event.id)
    } else {
      toast({
        title: strings.unexpectedError,
        status: 'error',
        duration: toastDurationMilli,
        isClosable: true,
        position: 'top',
      })
      console.error('Invalid state. Check server logs.')
    }
  }

  useEffect(() => {
    if (isOpen) return
    setStart(event.start)
    setEnd(event.end)
  }, [event.end, event.start, isOpen])

  const formattedEnd = format(end, 'dd-MM-yyyy')

  const isNewEvent = !event.id

  const header = isNewEvent ? strings.addEvent : strings.updateEvent

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            title: event.title,
            startTime: format(event.start, timeFormats[0]),
            endTime: format(event.end, timeFormats[0]),
            notes: event.notes,
            saveButton: undefined,
            deleteButton: undefined,
            type: event.type,
          }}
          onSubmit={async (values) => {
            // TODO: loading indicator
            const { title, notes, saveButton, deleteButton, type } = values
            if (saveButton) {
              const eventToSave = {
                id: event.id,
                title,
                start,
                end,
                notes,
                type,
              }
              const saveResult = await onSaveEvent(eventToSave)
              parseUpdateResults(saveResult, false)
            }
            if (deleteButton) {
              if (!event.id) return
              const doIt = async () => {
                const saveResult = await onDeleteEvent(event)
                parseUpdateResults(saveResult, true)
              }
              if (willDeleteEvent) {
                willDeleteEvent(event, doIt)
              } else {
                doIt()
              }
            }
          }}
          validationSchema={EventSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, setFieldTouched, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <Stack spacing={spacing}>
                  {eventTypes.length > 1 ? (
                    <RadioButtons name={'type'} options={eventTypes} />
                  ) : null}

                  <InputField
                    label={strings.title}
                    name={'title'}
                    placeholder={strings.eventTitlePlaceholder}
                  />

                  <HStack>
                    <Stack flex={1}>
                      <TimeField
                        label={strings.from}
                        name={'startTime'}
                        date={start}
                        onDate={(time: Date) => {
                          setStart(time)
                          setFieldTouched('startTime', true)
                        }}
                        timeFormats={timeFormats}
                      />
                      <Checkbox visibility="hidden">
                        <Text>{formattedEnd}</Text>
                      </Checkbox>
                    </Stack>
                    <Stack flex={1}>
                      <TimeField
                        label={strings.to}
                        name={'endTime'}
                        date={end}
                        onDate={(time: Date) => {
                          setEnd(time)
                          setFieldTouched('endTime', true)
                        }}
                        timeFormats={timeFormats}
                      />
                      <Checkbox
                        defaultIsChecked={endConfirmed}
                        isChecked={endConfirmed}
                        onChange={(event) => {
                          setEndConfirmed(event.target.checked)
                        }}
                      >
                        <Text>
                          {`${strings.ends} ${
                            isSameDay(start, end)
                              ? `${strings.sameDay}`
                              : formattedEnd
                          }`}
                        </Text>
                      </Checkbox>
                    </Stack>
                  </HStack>

                  <Box hidden={endConfirmed}>
                    <DatePicker
                      date={end}
                      onDate={(newEndDate: Date) => {
                        setEnd(newEndDate)
                        setEndConfirmed(true)
                      }}
                      config={config}
                    />
                  </Box>

                  <TextView
                    icon={<BiPencil />}
                    label={strings.notes}
                    name={'notes'}
                    placeholder={strings.eventNotesPlaceholder}
                  />
                </Stack>
              </ModalBody>
              <ModalFooter>
                {isNewEvent ? null : (
                  <>
                    <Button
                      colorScheme="red"
                      type="button"
                      isLoading={isSubmitting}
                      onClick={() => {
                        setFieldValue('deleteButton', 1, false)
                        handleSubmit()
                      }}
                    >
                      {strings.delete}
                    </Button>
                    <Spacer />
                  </>
                )}
                <Button
                  type="button"
                  isLoading={isSubmitting}
                  onClick={() => {
                    setFieldValue('saveButton', 1, false)
                    handleSubmit()
                  }}
                >
                  {strings.save}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default EventModal
