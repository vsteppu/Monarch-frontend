import { computed, onMounted, ref, watch } from "vue"
import { MONTHS } from "@/stores/store";

export const useCreateCalendar = () => {
    const date = new Date()
    const selectedDay = ref(date.getDate())
    const month = ref(date.getMonth())
    const year = ref(date.getFullYear())
    const monthToString = ref(MONTHS[month.value])
    const firstDayOfCurentMonth = ref(new Date(year.value, month.value, 1))
    const lastDayOfCurrentMonth = ref(new Date(year.value, month.value + 1 , 0))
    const dayOfWeek = ref(firstDayOfCurentMonth.value.getDay() - 1)
    const calendar = ref(null)

    const createCalendar = (dayNumber) => {
        return Array.from({ length: 42 }, (_, i) => (i - dayNumber) + 1)
    }

    const setCalendar = (date) => {
        if (date <= 0) {
            const lastDayOfPreviousMonth = new Date(year.value, month.value, date)
            return lastDayOfPreviousMonth.getDate()
        } else if (date > lastDayOfCurrentMonth.value.getDate()) {
            return date - lastDayOfCurrentMonth.value.getDate()
        } else {
            const lastDayOfCurrentMonth = new Date(year.value, month.value, date)
            return lastDayOfCurrentMonth.getDate()
        }
    }

    const nextMonthHandler = async () => {
        month.value++
        if (month.value === 12) {
            month.value = 0
            year.value++
        }

        firstDayOfCurentMonth.value = new Date(year.value, month.value, 1)
        lastDayOfCurrentMonth.value = new Date(year.value, month.value + 1 , 0)

        dayOfWeek.value = firstDayOfCurentMonth.value.getDay() - 1

        return monthToString.value = MONTHS[month.value]
    }

    const previousMonthHandler = async () => {
        month.value--
        if (month.value < 0) {
            month.value = 11
            year.value--
        }

        firstDayOfCurentMonth.value = new Date(year.value, month.value, 1)
        lastDayOfCurrentMonth.value = new Date(year.value, month.value + 1 , 0)
        dayOfWeek.value = firstDayOfCurentMonth.value.getDay() - 1

        return monthToString.value = MONTHS[month.value]
    }

    watch(dayOfWeek, (newVal) => {;
        if (newVal < 0) newVal = 7 + newVal
        calendar.value = createCalendar(newVal)
    })

    onMounted(() => {
        calendar.value = createCalendar(dayOfWeek.value)
    })

    return {
        date,
        month,
        year,
        monthToString,
        firstDayOfCurentMonth,
        lastDayOfCurrentMonth,
        calendar,
        selectedDay,

        createCalendar,
        setCalendar,
        previousMonthHandler,
        nextMonthHandler,
    }

}