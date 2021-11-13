import { Form, Input, Select, Button, message } from 'antd'
import { useState } from 'react'
import { useCases } from '../config/deps'
import './styles.css'

const DonationSubmit = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const response = await useCases.donationSubmit({ ...values })
      if (!response.donationId) {
        throw new Error()
      }
      message.success(`You donation request was submitted (Id: ${response.donationId}), a confirmation email will be sent to you shortly.`)
      form.resetFields()
    } catch (err) {
      message.error('Oops...')
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>Submit donation request</h1>
      <Form
        form={form}
        name='donationForm'
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please enter your name.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter a valid email.'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Phone Number'
          name='phoneNumber'
          rules={[
            {
              required: true,
              message: 'Please enter a phone number.'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Region'
          name='region'
          rules={[{ required: true, message: 'Please select your region.' }]}
        >
          <Select placeholder='Please select your state'>
            <Select.Option value='vic_melbourne'>
              VIC - Melbourne - Ready Now!
            </Select.Option>
            <Select.Option value='qld_brisbane'>
              QLD - Brisbane - Ready Now!
            </Select.Option>
            <Select.Option value='qld_goldcoast'>
              QLD - Gold Coast - Coming soon!
            </Select.Option>
            <Select.Option value='nsw_sydney'>
              NSW - Sydney - Coming soon!
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Suburb'
          name='suburb'
          rules={[{ required: true, message: 'Please enter your suburb.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Type of Donation'
          name='donationType'
          rules={[
            { required: true, message: 'Please select a donation type.' }
          ]}
        >
          <Select placeholder='Type of donation'>
            <Select.Option value='onceOff'>Once-off donations</Select.Option>
            <Select.Option value='regular'>
              Can help with regular donations
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Extra Information' name='description'>
          <Input.TextArea placeholder='Please tell us more about the equipment you have available, and location where you would like to have it picked up from, and any info about preferred timings, etc.' />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 32 }}>
          <div className='formButton'>
            <Button type='primary' htmlType='submit' loading={loading}>
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export { DonationSubmit }
